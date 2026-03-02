import Link from 'next/link';
import LepineScript from '../../../assets/svg/lepineScript.svg';
import { ImageLoader } from '../../../utils/imageLoader';

const CondensedNav = () => (<nav className="condensedNav"><Link href="/">{ImageLoader(LepineScript.src, '', '', 176, 50, 0.1)}</Link></nav>);

export default CondensedNav;