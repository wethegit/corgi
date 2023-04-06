import { setupPaths, setupProps } from "#utils/page-setup";
import PageProvider from "#context/page-context";
import useLocale from "#hooks/use-locale";

const LOCALE_FOLDER = "subpage";

const Subpage = ({}) => {
  const { page, globals } = useLocale(LOCALE_FOLDER);

  return (
    <PageProvider page={LOCALE_FOLDER}>
      <header>
        <h1>{page.title}</h1>
        <p>{page.subtitle}</p>
      </header>
    </PageProvider>
  );
};

export const getStaticPaths = () => setupPaths(LOCALE_FOLDER);
export const getStaticProps = async (ctx) => setupProps(ctx, LOCALE_FOLDER);

export default Subpage;
