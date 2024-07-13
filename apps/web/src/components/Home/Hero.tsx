import Image from 'next/image';
import Tilt from 'react-parallax-tilt';
import BuilderScreenshot from '../../assets/images/builder.png';
import Authentication from '@/components/Home/Authentication';
import { BlurFade, GradualSpacing } from 'ui';

const Hero = () => {
  return (
    <section id="hero" className="relative bg-background">
      <div className="px-6 lg:flex lg:h-screen lg:items-center lg:px-12">
        <BlurFade
          inView
          className="mb-12 mt-48 shrink-0 lg:mx-0 lg:mt-0 lg:pt-8"
        >
          <div className="mt-10 space-y-2">
            <GradualSpacing
              className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl"
              text="Build your own resume"
            />

            <GradualSpacing
              containerClassName="justify-start"
              className="text-lg leading-8 tracking-tight text-foreground dark:prose-invert"
              text="Creating, updating and sharing your resumes."
            />

            <div className="flex items-center">
              <Authentication />
            </div>
          </div>
        </BlurFade>

        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-20">
          <div className="flex-none sm:max-w-5xl lg:max-w-none">
            <BlurFade>
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
            </BlurFade>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
