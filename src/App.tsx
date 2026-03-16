import { QueryProvider } from "./app/providers/QueryProvider"
import { AppRouter } from "./app/router"


export const App = ( ) => {
  return (

    <QueryProvider>
      <AppRouter/>
    </QueryProvider>
  )
}
