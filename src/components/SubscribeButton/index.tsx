import { error } from "console";
import { signIn, useSession } from "next-auth/react";
import { api } from "../../services/api";
import styles from "./styles.module.scss";
import { getStripeJs } from "../../services/stripe-js";
interface SubscribeButtonProps {
  priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const { data: session } = useSession();

  async function handleSubscribe() {
    // Se o usuário não estiver logado, chama a função de login
    if (!session) {
      signIn("github");
      return;
    }
    //Se tiver logado cria a checkout session []
    try {
      const response = await api.post("/subscribe");

      const { sessionId } = response.data;

      const stripe = await getStripeJs();

      await stripe.redirectToCheckout({ sessionId });
    } catch (err) {
      alert(err.message);
    }
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
