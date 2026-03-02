import { useEffect } from "react"
import { useRouter } from "next/router"
import propertyRedirect from "../utils/propertyRedirect";

export default function Custom404() {
  const router = useRouter();

  useEffect(() => {
    const path = router.asPath;

    if (path === '/herosRidge' || path === '/heroesRidge' || path === '/heroesridge') {
      router.push('/herosridge');
    } else if (path.includes('/property')) {
      const propertyPath = propertyRedirect(path);
      router.push(propertyPath);
    } else if (path.includes('/comingSoon')) {
      const propertyPath = propertyRedirect(path);
      router.push(propertyPath);
    } else if (path.includes('/locations')) {
      const propertyPath = propertyRedirect(path);
      router.push(propertyPath);
    } else {
      router.push('/');
    }
  });

  return (
    <div className="redirect__container">
      <div className="redirect__content">
        <h3>Redirecting you to lepineapartments.com</h3>
      </div>
    </div>
  )
}