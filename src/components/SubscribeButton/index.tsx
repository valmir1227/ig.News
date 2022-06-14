import { signIn, useSession } from "next-auth/react";
import styles from "./styles.module.scss";

interface SubscribeButtonProps {
  priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const { session } = useSession();

  function handleSubscribe() {
    // Se o usuário não estiver logado, chama a função de login
    if (!session) {
      signIn("github");
      return;
    }
    //Se tiver logado cria a checkout session []
  }

  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      Subscribe Now
    </button>
  );
}
