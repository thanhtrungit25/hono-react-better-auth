import { createFileRoute } from '@tanstack/react-router'
import { hc } from 'hono/client'
import type { AppType } from '../../../server'
import { useQuery } from '@tanstack/react-query'
import { CircleX } from 'lucide-react'

const client = hc<AppType>('/')

export const Route = createFileRoute('/todos')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const resp = await client.api.todos.$get()
      if (!resp.ok) throw new Error('Failed to fetch todos')
      return resp.json()
    },
  })

  return (
    <div className="flex flex-col items-center p-20">
      {isError && (
        <div role="alert" className="alert alert-error">
          <CircleX />
          <span>Error! {error.message}</span>
        </div>
      )}
      <div className="space-y-6 p-6">
        {isLoading && (
          <>
            {[1, 2, 3, 4, 5].map(() => (
              <div className="flex items-center gap-2">
                <div className="skeleton h-6 w-6 rounded-full"></div>
                <div className="skeleton h-6 w-32"></div>
              </div>
            ))}
          </>
        )}

        {data &&
          data.map((todo) => (
            <div key={todo.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                defaultChecked
                className="checkbox checkbox-primary"
              />
              <span>{todo.title}</span>
            </div>
          ))}
      </div>
    </div>
  )
}
