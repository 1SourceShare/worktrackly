import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        try {
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();

          if (profile?.role === 'admin') {
            navigate("/admin");
            toast({
              title: "Добро пожаловать, администратор!",
              description: "Вы успешно вошли в систему",
            });
          } else {
            navigate("/");
            toast({
              title: "Добро пожаловать!",
              description: "Вы успешно вошли в систему",
            });
          }
        } catch (error) {
          console.error('Error fetching user role:', error);
          navigate("/");
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const createTestUsers = async () => {
    try {
      // Create admin user
      const { error: adminError } = await supabase.auth.signUp({
        email: 'admin@test.com',
        password: 'admin123',
      });

      if (adminError) throw adminError;

      // Create regular user
      const { error: userError } = await supabase.auth.signUp({
        email: 'user@test.com',
        password: 'user123',
      });

      if (userError) throw userError;

      // Set admin role
      const { data: adminUser } = await supabase
        .from('auth')
        .select('id')
        .eq('email', 'admin@test.com')
        .single();

      if (adminUser) {
        await supabase
          .from('profiles')
          .update({ role: 'admin' })
          .eq('id', adminUser.id);
      }

      toast({
        title: "Тестовые пользователи созданы",
        description: "admin@test.com / admin123\nuser@test.com / user123",
      });
    } catch (error) {
      console.error('Error creating test users:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось создать тестовых пользователей",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <Card className="w-full max-w-md p-6 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold">Вход в систему</h1>
          <p className="text-muted-foreground">Войдите в свой аккаунт</p>
        </div>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="light"
          providers={[]}
          localization={{
            variables: {
              sign_in: {
                email_label: "Email",
                password_label: "Пароль",
                button_label: "Войти",
                loading_button_label: "Вход...",
              },
              sign_up: {
                email_label: "Email",
                password_label: "Пароль",
                button_label: "Зарегистрироваться",
                loading_button_label: "Регистрация...",
              },
            },
          }}
        />
        <div className="pt-4 text-center">
          <Button 
            variant="outline" 
            onClick={createTestUsers}
            className="w-full"
          >
            Создать тестовых пользователей
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Login;