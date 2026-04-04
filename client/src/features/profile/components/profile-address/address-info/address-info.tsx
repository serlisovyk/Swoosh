import { useProfile } from '@features/auth'
import styles from './address-info.module.css'

export function AddressInfo() {
  const { user } = useProfile()

  if (!user) return null

  const { phone, email, address } = user

  const { region, city, street, zip, buildingNumber } = address || {}

  const fullAddress = `${zip}, ${city}, ${region}, ${street}, ${buildingNumber}`

  return (
    <div className={styles.wrapper}>
      <div className={styles.fullAddress}>{fullAddress}</div>
      <div>
        <div className={styles.label}>Телефон</div>
        <div>{phone}</div>
      </div>
      <div>
        <div className={styles.label}>Email</div>
        <div>{email}</div>
      </div>
    </div>
  )
}
