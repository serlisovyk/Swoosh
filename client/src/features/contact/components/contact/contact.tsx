import { Heading } from '@shared/ui'
import { ContactForm } from '../contact-form'
import styles from './contact.module.css'

export function Contact() {
  return (
    <section className={styles.section} aria-labelledby="contact-title">
      <div className="container">
        <div className={styles.box}>
          <Heading as="h1" className={styles.title} id="contact-title">
            У вас есть вопросы? Напишите нам!
          </Heading>

          <p className={styles.description}>
            Мы с радостью ответим на все интересующие вас вопросы.
          </p>

          <ContactForm />
        </div>
      </div>
    </section>
  )
}
