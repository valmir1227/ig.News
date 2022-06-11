import styles from "./styles.module.scss";
import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";

import { useSession, signIn, signOut } from "next-auth/react";

export function SignInButton() {
  const { data: session, status } = useSession();
  //console.log(status);
  return session ? (
    <button
      className={styles.signInButton}
      type="button"
      onClick={() => signOut({ redirect: false })}
    >
      <FaGithub color="#04d361" />
      {session.user.name}
      <FiX color="#737380" className={styles.closeIcon} />
    </button>
  ) : (
    <button
      className={styles.signInButton}
      type="button"
      onClick={() => signIn("github")}
    >
      <FaGithub color="#eba417" />
      Sign in with Github
    </button>
  );
}
