import { motion } from "framer-motion"

interface BounceAnimateProps {
     children: React.ReactNode
     delayVal: number
}

export const BounceInTop = ({ children, delayVal }: BounceAnimateProps) => {
     const bounceEffect = {
          hidden: { opacity: 0, y: 100 },
          visible: { opacity: 1, y: 0, }
     }

     return (
          <motion.div
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               transition={{
                    type: 'spring',
                    stiffness: 100,
                    damping: 10,
                    delay: delayVal
               }}
               variants={bounceEffect}
          >
               {children}
          </motion.div>
     )
}

export const BounceInRight = ({ children, delayVal }: BounceAnimateProps) => {
     const bounceEffect = {
          hidden: { opacity: 0, x: -100 },
          visible: { opacity: 1, x: 0, }
     }

     return (
          <motion.div
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               transition={{
                    type: 'spring',
                    stiffness: 100,
                    damping: 10,
                    delay: delayVal
               }}
               variants={bounceEffect}
          >
               {children}
          </motion.div>
     )
}
export const BounceInBottom = ({ children, delayVal }: BounceAnimateProps) => {
     const bounceEffect = {
          hidden: { opacity: 0, y: -100 },
          visible: { opacity: 1, y: 0, }
     }

     return (
          <motion.div
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               transition={{
                    type: 'spring',
                    stiffness: 100,
                    damping: 10,
                    delay: delayVal
               }}
               variants={bounceEffect}
          >
               {children}
          </motion.div>)
}
export const BounceInLeft = ({ children, delayVal }: BounceAnimateProps) => {
     const bounceEffect = {
          hidden: { opacity: 0, x: 100 },
          visible: { opacity: 1, x: 0, }
     }

     return (
          <motion.div
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               transition={{
                    type: 'spring',
                    stiffness: 100,
                    damping: 10,
                    delay: delayVal
               }}
               variants={bounceEffect}
          >
               {children}
          </motion.div>
     )
}