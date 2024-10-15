const DashVertical = ({ className }: { className?: string }) => {
     return (
          <div
               className={`h-[4.5rem] border-l-[2.5px] md:h-10 mt-1 border-dashed border-secondary
               ${className}`} />
     )
}

export default DashVertical