import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { GetServerSideProps } from "next";

export default function Home() {
  const { user } = useUser()

  return (
    <div>
      <div>
        <h1>Hello {user ? user.name : 'World'}</h1>
      </div>

      <a href="/api/auth/logout">Logout</a>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = withPageAuthRequired()