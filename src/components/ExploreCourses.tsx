import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';
import {
  BookOpen,
  GraduationCap,
  Code,
  Palette,
  Briefcase,
  Globe,
} from 'lucide-react';

const courses = [
  {
    icon: BookOpen,
    title: 'Elementary Education',
    description: '1st-5th Grade interactive learning with games and quizzes',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: GraduationCap,
    title: 'Middle School',
    description: '6th-8th Grade comprehensive curriculum',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Code,
    title: 'High School',
    description: '9th-12th Grade advanced courses and AP classes',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Palette,
    title: 'Creative Arts',
    description: 'Design, music, and digital arts programs',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: Briefcase,
    title: 'Professional Certifications',
    description: 'Industry-recognized certificates and skills',
    color: 'from-yellow-500 to-amber-500',
  },
  {
    icon: Globe,
    title: 'University Degrees',
    description: 'Fully accredited bachelor and master programs',
    color: 'from-indigo-500 to-purple-500',
  },
];

export const ExploreCourses = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);

  return (
    <section
      id="courses"
      ref={containerRef}
      className="py-24 relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <motion.div style={{ opacity, scale }} className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4 gradient-text">
            {t('courses.title')}
          </h2>
          <p className="text-xl text-muted-foreground">{t('courses.subtitle')}</p>
        </motion.div>

        {/* Horizontal scroll container */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {courses.map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  z: 50,
                }}
                className="flex-shrink-0 w-80 snap-center"
              >
                <div className="glass rounded-2xl p-6 h-full hover-glow transition-all duration-300 border border-border group">
                  {/* Icon with gradient background */}
                  <div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <course.icon className="h-8 w-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold mb-3 text-foreground">
                    {course.title}
                  </h3>
                  <p className="text-muted-foreground">{course.description}</p>

                  {/* Decorative line */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                    className={`h-1 rounded-full bg-gradient-to-r ${course.color} mt-4`}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center mt-8"
        >
          <p className="text-sm text-muted-foreground">
            ← Scroll horizontally to explore all courses →
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};
