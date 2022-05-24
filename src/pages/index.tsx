import Image from "next/image";
import Head from "next/head";
import { SubscribeButton } from "../components/SubscribeButton";

import { GetServerSideProps } from "next";
import { stripe } from "../services/stripe";

import styles from "./home.module.scss";
import girlCoding from "../../public/images/avatar.svg";
interface HomeProps {
  product: {
    id: string;
    amount: number;
  };
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | igNews</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>
            News about the <span>React</span> world.
          </h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton />
        </section>
        <Image src={girlCoding} alt="Girl coding" />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  const price = await stripe.prices.retrieve("price_1L2HLVJeuGXVRPehQ7QN64zh");

  const product = {
    priceID: price.id,
    amount: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price.unit_amount / 100),
  };

  return {
    props: {
      product,
    },
  };
};
