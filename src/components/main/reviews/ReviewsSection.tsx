'use client';

import { Container, ReviewCard, Section } from '@/components';
import commentList from '@/data/reviews.json';
import { useTranslations } from 'next-intl';

export const ReviewsSection: React.FC = () => {
  const t = useTranslations('common');

  return (
    <Section withContainer={false}>
      <div className="reviews-section">
        <Container>
          <div className="flex flex-col lg:items-end pt-4 md:pt-6 lg:pt-[22px] ">
            <h2 className="flex text-white self-end items-end justify-end flex-wrap text-h1 md:w-[353px] lg:w-[625px] lg:text-h3-d">
              {t('reviewTitle')}
              <p className="flex">
                <span className="flex indent-2 text-btn-hover">Do</span>
                Good
              </p>
            </h2>
            <div
              className="flex flex-col md:flex-row gap-6 mt-[73px] md:mt-[93px] lg:mt-10 md:pb-10 lg:pb-[54px]
            "
            >
              <div className="flex flex-col gap-6 justify-center md:w-[312px] lg:w-[347px] h-full order-first md:order-last">
                {commentList.slice(0, 3).map((comment, idx) => (
                  <ReviewCard
                    key={`${idx}-${comment.author}`}
                    review={comment}
                    index={idx}
                  />
                ))}
              </div>

              <div className="flex gap-6 md:w-[312px] justify-center lg:w-[347px] order-last md:order-first flex-col-reverse md:flex-col lg:flex-col-reverse">
                {commentList.slice(3).map((comment, idx) => (
                  <ReviewCard
                    key={`${idx}-${comment.author}`}
                    review={comment}
                    index={idx}
                  />
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </Section>
  );
};
