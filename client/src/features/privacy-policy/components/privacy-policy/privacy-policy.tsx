import { Heading } from '@shared/ui'
import { PRIVACY_POLICY_DATA } from '../../data'
import styles from './privacy-policy.module.css'

export function PrivacyPolicy() {
  return (
    <div className="container">
      <article className={styles.article}>
        <Heading as="h1" className={styles.title}>
          Политика конфиденциальности
        </Heading>

        {PRIVACY_POLICY_DATA.map((item) => (
          <section key={item.title} className={styles.section}>
            <Heading as="h2" className={styles.title}>
              {item.title}
            </Heading>

            {item.paragraph && <p>{item.paragraph}</p>}

            {item.list && (
              <ul>
                {item.list.map((listItem) => (
                  <li key={listItem}>{listItem}</li>
                ))}
              </ul>
            )}

            {item.subParagraph && <p>{item.subParagraph}</p>}

            {item.subList && (
              <ul>
                {item.subList.map((subListItem) => {
                  const [bold, ...rest] = subListItem.split(': ')

                  return (
                    <li key={subListItem}>
                      <strong>{bold}:</strong> {rest.join(': ')}
                    </li>
                  )
                })}
              </ul>
            )}
          </section>
        ))}

        <div className={styles.footer}>
          <p>Последнее обновление: март 2026</p>
        </div>
      </article>
    </div>
  )
}
