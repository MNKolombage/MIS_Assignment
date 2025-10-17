import Head from 'next/head'
import Header from '../Header'

export default function MainLayout({ children, title = 'Nisala Villa', description }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        {description && <meta name="description" content={description} />}
      </Head>

      {/* Skip link for keyboard users */}
      <a className="sr-only focus:not-sr-only focus:absolute top-4 left-4 z-50 bg-white px-3 py-2 rounded shadow"
         href="#main-content">Skip to content</a>

      <div className="min-h-screen flex flex-col bg-gray-100">
        {/* Global header */}
        <Header />

        {/* Main content area */}
        <main id="main-content" role="main" className="flex-grow">
          <div className="max-w-4xl mx-auto px-4 py-8">
            {children}
          </div>
        </main>
      </div>
    </>
  )
}
