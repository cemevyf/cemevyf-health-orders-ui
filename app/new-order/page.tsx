import OrderStepper from '@/components/nav/OrderStepper';


export default function NewOrder() {
  return (
        <div className="w-[96%] lg:max-w-7xl flex flex-col mx-auto gap-6 h-full">
            <OrderStepper/>
        </div>
  );
}
