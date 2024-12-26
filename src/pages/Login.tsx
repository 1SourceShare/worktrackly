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
      // Get user by email
      const { data: { users }, error: getUserError } = await supabase.auth.admin.listUsers();
      if (getUserError) throw getUserError;

      const user = users.find(u => u.email === 'n_matvey@icloud.com');
      if (!user) {
        throw new Error('User not found');
      }

      // Update user role to admin
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ role: 'admin' })
        .eq('id', user.id);

      if (updateError) throw updateError;

      toast({
        title: "Роль обновлена",
        description: "Пользователь n_matvey@icloud.com теперь администратор",
      });
    } catch (error) {
      console.error('Error updating user role:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось обновить роль пользователя",
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
            Сделать n_matvey@icloud.com администратором
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Login;