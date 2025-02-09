type TotalQuoteProps = {
    description: string
    total: string
}

export default function TotalQuote({ description, total }: TotalQuoteProps) {
  return (
        <div className='flex justify-between py-3 px-3 sm:px-6 bg-neutral-300/60 rounded-lg'>
            <div>
                <p className='text-lg font-medium text-negro-opaco'>{description}</p>
            </div>
            <div >
                <p className='text-lg font-bold text-negro-opaco'>$ {total}</p>
            </div>
        </div>
  );
}
