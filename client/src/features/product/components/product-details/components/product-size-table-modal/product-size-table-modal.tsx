'use client'

import { Modal } from '@shared/ui'
import { PRODUCT_SIZE_TABLE_ROWS } from '../../../../data'
import { ProductSizeTableModalProps } from '../../../../types'
import styles from './product-size-table-modal.module.css'

// TODO: Create table like in figma layout
export function ProductSizeTableModal({
  isOpen,
  onClose,
}: ProductSizeTableModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Размерная таблица"
      closeLabel="Закрыть размерную таблицу"
      panelClassName={styles.panel}
      headerClassName={styles.header}
      titleClassName={styles.title}
      closeButtonClassName={styles.closeButton}
      contentClassName={styles.body}
    >
      <div className={styles.content}>
        <p className={styles.text}>
          Сверяйте длину стопы с вашей привычной посадкой и выбирайте ближайший
          размер из таблицы ниже.
        </p>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Длина стопы (см)</th>
                <th>RU</th>
                <th>US</th>
                <th>EU</th>
                <th>UK</th>
              </tr>
            </thead>

            <tbody>
              {PRODUCT_SIZE_TABLE_ROWS.map((row) => (
                <tr key={`${row.footLength}-${row.eu}`}>
                  <td>{row.footLength}</td>
                  <td>{row.ru}</td>
                  <td>{row.us}</td>
                  <td>{row.eu}</td>
                  <td>{row.uk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Modal>
  )
}
