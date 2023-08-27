import { useState, useEffect } from 'react'
import { CaretLeft, CaretRight } from 'phosphor-react'
import { Comic } from '@/types/marvel'
import Image from 'next/image'
import next from 'next'

interface SlideProps {
  data: Comic[]
  autoSlide: boolean
  autoSlideInterval: number
}

export function Carousel({
  data,
  autoSlide = false,
  autoSlideInterval = 3000,
}: SlideProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  function handlePrevImage() {
    setCurrentImageIndex((currentImageIndex) =>
      currentImageIndex === 0 ? data.length - 1 : currentImageIndex - 1,
    )
  }

  function handleNextImage() {
    setCurrentImageIndex((currentImageIndex) =>
      currentImageIndex === data.length - 1 ? 0 : currentImageIndex + 1,
    )
  }

  useEffect(() => {
    if (!autoSlide) return
    const slideInterval = setInterval(next, autoSlideInterval)
    return () => clearInterval(slideInterval)
  }, [autoSlideInterval, autoSlide])

  return (
    <div className="flex h-full flex-col items-center lg:h-[525px] lg:flex-row">
      <div className="flex h-full items-center justify-center rounded-l border border-zinc-700">
        <div className="relative w-full overflow-hidden lg:w-[300px]">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
          >
            {data.map((comic) => (
              <Image
                key={comic.id}
                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                alt={comic.title}
                width={900}
                height={900}
              />
            ))}
          </div>
          <div className="flex items-center justify-between p-4">
            <button
              onClick={handlePrevImage}
              className="flex h-8 items-center justify-center gap-2 text-zinc-300 shadow transition-colors hover:font-medium hover:text-zinc-50"
            >
              <CaretLeft className="h-6 w-6" />
              Prev
            </button>

            <button
              onClick={handleNextImage}
              className="flex h-8 items-center justify-center gap-2 text-zinc-300 shadow transition-colors hover:font-medium hover:text-zinc-50"
            >
              Next
              <CaretRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex h-full w-full flex-col gap-4 overflow-y-scroll rounded-r border border-zinc-700 bg-zinc-900 p-8 lg:w-[672px]">
        <h2 className="text-lg font-semibold text-zinc-100">Comic details:</h2>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-zinc-300">Title:</label>
            <strong className="text-xl font-bold text-zinc-50">
              {data[currentImageIndex].title !== ''
                ? data[currentImageIndex].title
                : ''}
            </strong>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold text-zinc-300">Description:</label>
            <span className="text-lg text-zinc-50">
              {data[currentImageIndex].description === ''
                ? 'Insufficient information found for this character.'
                : data[currentImageIndex].description}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold text-zinc-300">
              Number of pages:
            </label>
            <span className="text-lg text-zinc-50">
              {data[currentImageIndex].pageCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
