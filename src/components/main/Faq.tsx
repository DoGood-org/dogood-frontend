import React from 'react';
import ContactForm from '../faq/ContactForm';
import { Container } from '../ui/Container';
const Faq = (): React.JSX.Element => {
  return (
    <section className="mx-auto w-full py-[100px]">
      <Container>
        <div className="flex flex-col ">
          <div className="bg-card rounded-[10px] p-[20px] md:p-[60px]">
            <div className=" flex justify-center sm:py-0 gap-[60px] sm:flex-col-reverse xl:flex-row">
              <ContactForm />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
export default Faq;
