'use client'

import EmblaCarousel, {
  type EmblaCarouselType,
  type EmblaOptionsType,
} from 'embla-carousel'
import cn from 'clsx'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
import { Heading } from '../heading'
import type { CarouselProps } from './types'
import styles from './carousel.module.css'

const CAROUSEL_OPTIONS: EmblaOptionsType = {
  align: 'start',
  loop: false,
  dragFree: false,
  skipSnaps: false,
  containScroll: 'trimSnaps',
  slidesToScroll: 1,
}

export function Carousel<T>({
  title,
  items,
  getItemKey,
  renderItem,
  ariaLabel,
  variant = 'contained',
  isInteractive = true,
  emptyContent,
}: CarouselProps<T>) {
  const headingId = useId()
  const viewportId = useId()
  const viewportRef = useRef<HTMLDivElement | null>(null)
  const emblaRef = useRef<EmblaCarouselType | null>(null)

  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [snapCount, setSnapCount] = useState(0)

  useEffect(() => {
    if (!viewportRef.current || !items.length || !isInteractive) return

    const embla = EmblaCarousel(viewportRef.current, CAROUSEL_OPTIONS)

    const syncState = () => {
      setCanScrollPrev(embla.canScrollPrev())
      setCanScrollNext(embla.canScrollNext())
      setSelectedIndex(embla.selectedScrollSnap())
      setSnapCount(embla.scrollSnapList().length)
    }

    syncState()
    embla.on('select', syncState)
    embla.on('reInit', syncState)

    emblaRef.current = embla

    return () => {
      embla.destroy()
      emblaRef.current = null
    }
  }, [isInteractive, items.length, variant])

  const resolvedCanScrollPrev = isInteractive && items.length > 0 && canScrollPrev
  const resolvedCanScrollNext = isInteractive && items.length > 0 && canScrollNext
  const resolvedSelectedIndex = isInteractive ? selectedIndex : 0
  const resolvedSnapCount = isInteractive ? snapCount : items.length

  const handleScrollPrev = () => {
    emblaRef.current?.scrollPrev()
  }

  const handleScrollNext = () => {
    emblaRef.current?.scrollNext()
  }

  const bodyContent = items.length ? (
    <div
      aria-label={ariaLabel ?? title}
      aria-roledescription="carousel"
      className={styles.viewport}
      id={viewportId}
      ref={viewportRef}
    >
      <div
        className={cn(
          styles.track,
          variant === 'bleedRight' && styles.trackBleedRight,
        )}
      >
        {items.map((item, index) => (
          <div className={styles.slide} key={getItemKey(item, index)}>
            {renderItem(item, index)}
          </div>
        ))}
      </div>
    </div>
  ) : (
    emptyContent
  )

  return (
    <section aria-labelledby={headingId} className={styles.section}>
      <div className={cn('container', styles.headerContainer)}>
        <div className={styles.header}>
          <Heading as="h2" className={styles.heading} id={headingId}>
            {title}
          </Heading>

          <div className={styles.controls}>
            <span aria-live="polite" className="visuallyHidden">
              {resolvedSnapCount
                ? `Слайд ${resolvedSelectedIndex + 1} из ${resolvedSnapCount}`
                : `Секция ${title}`}
            </span>

            <button
              aria-controls={viewportId}
              aria-label={`Прокрутить секцию ${title} назад`}
              className={styles.control}
              disabled={!resolvedCanScrollPrev}
              onClick={handleScrollPrev}
              type="button"
            >
              <ArrowLeft size={20} />
            </button>

            <button
              aria-controls={viewportId}
              aria-label={`Прокрутить секцию ${title} вперед`}
              className={styles.control}
              disabled={!resolvedCanScrollNext}
              onClick={handleScrollNext}
              type="button"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {variant === 'contained' ? (
        <div className={cn('container', styles.bodyContained)}>
          {bodyContent}
        </div>
      ) : (
        <div className={styles.bodyBleedRight}>{bodyContent}</div>
      )}
    </section>
  )
}
