export function Page({ children, ...props }) {
  return (
    <main id="main-content" {...props}>
      {children}
    </main>
  )
}
