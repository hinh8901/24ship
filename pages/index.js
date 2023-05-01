import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import Header from "@/partials/Home/Header"
import Services from "@/partials/Home/Services"
import PriceTable from "@/partials/Home/PriceTable"
import Quote from "@/partials/Home/Quote"

export default function Home() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Services />
      <PriceTable />
      <Quote />
    </QueryClientProvider>
  )
}
