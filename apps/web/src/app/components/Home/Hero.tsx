import { motion } from 'framer-motion';
import Image from 'next/image';
import Tilt from 'react-parallax-tilt';
import BuilderScreenshot from '../../../assets/images/builder.png';
import Authentication from '@/app/components/Home/Authentication';

const Hero = () => {
  return (
    <section id="hero" className="relative">
      <div className="px-6 lg:flex lg:h-screen lg:items-center lg:px-12">
        <motion.div
          className="mt-48 mb-12 shrink-0 lg:mx-0 lg:mt-0 lg:pt-8"
          viewport={{ once: true }}
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <div className="mt-10 space-y-2">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Build your own resumes
            </h1>
          </div>

          <p className="prose prose-base prose-zinc mt-2 text-lg leading-8 dark:prose-invert">
            Creating, updating and sharing your resumes.
          </p>

          <div className="mt-2 flex items-center gap-x-8">
            <Authentication />
          </div>
        </motion.div>

        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-20">
          <div className="flex-none sm:max-w-5xl lg:max-w-none">
            <motion.div
              viewport={{ once: true }}
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <Tilt
                scale={1.05}
                tiltMaxAngleX={8}
                tiltMaxAngleY={8}
                perspective={1400}
                glareEnable={true}
                glareMaxOpacity={0.1}
                glareColor="#fafafa"
              >
                <Image
                  width={3600}
                  height={2078}
                  src={BuilderScreenshot}
                  alt="Screenshot - Builder Screen"
                  className="w-[76rem] rounded-lg bg-background/5 shadow-2xl ring-1 ring-foreground/10"
                />
              </Tilt>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
