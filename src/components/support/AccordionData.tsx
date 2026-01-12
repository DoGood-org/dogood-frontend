import { AccordionItemData, IAccordionDataProps } from '@/types/support';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { Minus, Plus } from '../icons';

export const AccordionData = ({
  activeCategory,
  categoryData,
  openItem,
  toggleItem,
}: IAccordionDataProps): React.JSX.Element => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeCategory}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <div className="w-full space-y-2 md:space-y-4">
          {categoryData.items.map((item: AccordionItemData, index: number) => (
            <div key={item.id} className="space-y-0 text-foreground">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.2 + index * 0.1,
                  duration: 0.4,
                  ease: 'easeOut',
                }}
                className="bg-card rounded-xl"
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full text-left px-6 py-4 md:p-6 hover:bg-card/80 transition-colors rounded-xl"
                >
                  <span className="flex items-center justify-between w-full">
                    <h3 className="text-base text-foreground lg:text-h3">
                      {item.question}
                    </h3>
                    <div className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-muted hover:bg-muted/80 transition-colors">
                      <Plus
                        className={`h-3 w-3 transition-all duration-300 ${
                          openItem === item.id ? 'hidden' : 'block'
                        }`}
                      />
                      <Minus
                        className={`h-3 w-3 transition-all duration-300 ${
                          openItem === item.id ? 'block' : 'hidden'
                        }`}
                      />
                    </div>
                  </span>
                </button>
              </motion.div>

              <AnimatePresence>
                {openItem === item.id && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      height: 0,
                      marginTop: 0,
                    }}
                    animate={{
                      opacity: 1,
                      height: 'auto',
                      marginTop: 0,
                    }}
                    exit={{
                      opacity: 0,
                      height: 0,
                      marginTop: 0,
                    }}
                    transition={{
                      duration: 0.3,
                      ease: 'easeInOut',
                    }}
                    className="overflow-hidden"
                  >
                    <div className="h-2 md:h-4 bg-muted/50 rounded-full" />

                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: 0.1, duration: 0.2 }}
                      className="bg-card rounded-xl"
                    >
                      <div className="p-6">
                        <p className="whitespace-pre-line">{item.answer}</p>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
