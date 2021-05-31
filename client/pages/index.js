import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <header className={styles.user__header}>
          <img
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3219/logo.svg"
            alt=""
          />
          <h1 className={styles.user__title}>
            A lightweight and simple sign-up
          </h1>
        </header>

        <form className={styles.form}>
          <div className={styles.form__group}>
            <input
              type="text"
              placeholder="Username"
              className={styles.form__input}
            />
          </div>

          <div className={styles.form__group}>
            <input
              type="email"
              placeholder="Email"
              className={styles.form__input}
            />
          </div>

          <div className={styles.form__group}>
            <input
              type="password"
              placeholder="Password"
              className={styles.form__input}
            />
          </div>

          <button className={styles.btn} type="button">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
