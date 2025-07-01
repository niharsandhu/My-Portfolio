"use client";

import { useState } from "react";
import { motion } from "motion/react";

import { Timeline as ITimeline } from "../utils/interface";
import { SectionHeading } from "./ui/Typography";
import { SlideIn, Transition } from "./ui/Transitions";
import { formatDate } from "../utils";

interface EducationProps {
  timeline: ITimeline[];
}

const EducationTimeline = ({ timeline }: EducationProps) => {
  const education = timeline
    .filter((line) => line.forEducation && line.enabled === true)
    .sort((a, b) => a.sequence - b.sequence);

  const [hover, setHover] = useState<number | null>(null);

  return (
    <div className="relative pb-20">
      <span className="blob absolute top-[20%] left-0 w-1/3 h-5/6 blur-[100px] -z-10" />
      <SectionHeading className="pl-4 md:px-12 py-20">
        <SlideIn className="text-white/40">Education</SlideIn>
        <br />
        <SlideIn>Timeline</SlideIn>
      </SectionHeading>
      <div>
        {education.map((edu, index) => (
          <Transition
            key={edu._id}
            className="py-4 md:py-8 border-b border-white/10 hover:bg-white/5 px-2 md:px-12"
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(null)}
          >
            <div className="flex items-center justify-between md:gap-8">
              <span className="max-md:hidden">0{index + 1}</span>
              <div className="md:text-4xl text-xl md:font-semibold flex-1">
                {edu.jobTitle}
              </div>
              <div className="max-md:text-sm max-md:flex flex-col text-foreground/50">
                <span className="italic">
                  {formatDate(edu.startDate).month +
                    ", " +
                    formatDate(edu.startDate).year}
                </span>
                <span className="max-md:hidden">{" - "}</span>
                <span className="italic">
                  {formatDate(edu.endDate).month +
                    ", " +
                    formatDate(edu.endDate).year}
                </span>
              </div>
            </div>
            <div className="md:pl-12 py-2 text-foreground/50 max-md:text-sm flex items-center justify-between">
              <span>{edu.company_name}</span>
              <span>{edu.jobLocation}</span>
            </div>
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: hover === index ? "100%" : 0 }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden"
            >
              <p className="text-foreground/60 py-2">{edu.summary}</p>
              <ul className="list-disc list-inside">
                {edu.bulletPoints.map((point, index) => (
                  <li key={index} className="text-foreground/80 max-md:text-sm">
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          </Transition>
        ))}
      </div>
    </div>
  );
};

export default EducationTimeline;
