import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../services/stripe";
import { getSession } from "next-auth/react";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        //Cria um custormer dentro do painel do stripe
        const sesssion = await getSession({ req })

        const stripeCustomer = await stripe.customers.create({
            email: sesssion.user.email
            //metadata
        })
        const stripeCheckoutSession = await stripe.checkout.sessions.create({
            customer: stripeCustomer.id,
            payment_method_types: ["card"],
            billing_address_collection: "required",
            line_items: [
                { price: "price_1L2HLVJeuGXVRPehQ7QN64zh", quantity: 1 }
            ],
            mode: "subscription",
            allow_promotion_codes: true,
            success_url: process.env.STRIPE_SUCCESS_URL,
            cancel_url: process.env.STRIPE_CANCEL_URL,
        })
        return res.status(200).json({ sesssionId: stripeCheckoutSession.id })
    } else {
        res.setHeader("Allow", "POST")
        res.status(405).end("Method not allowed")
    }
} 