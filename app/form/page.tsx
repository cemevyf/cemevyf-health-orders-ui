import ClientForm from '@/components/forms/ClientForm';
import SearchClientForm from '@/components/forms/SearchClientForm';
import SearchDocForm from '@/components/forms/SearchDocForm';
import SearchOrderForm from '@/components/forms/SearchOrderForm';


export default function Form() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <ClientForm/>

      <SearchDocForm/>

      <SearchClientForm/>

      <SearchOrderForm/>
    </div>
  );
}
