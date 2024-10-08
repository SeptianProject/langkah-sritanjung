import React from 'react'

type DotElementProps = {
     className?: string
     children?: React.ReactNode
}

const DotElement = ({ className, children }: DotElementProps) => {
     return (
          <div className={`size-14 bg-primary rounded-full ${className}`}>
               {children}
          </div>
     )
}

export default DotElement