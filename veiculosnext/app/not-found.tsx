import Footer from '@/components/footer';
import Header from '../components/header/index'
import Link from 'next/link';
import './not-found.css'

const NotFound = () => {
  return (
    <>
    <Header/>
      <div className='flex-NotFound'> 
        <h1><strong>404</strong> Página não encontrada</h1>
        <p>A página que você procura não existe</p>
        <br></br>
        
        <Link href="/" className="link__notFound"> Voltar para Home </Link>
      </div>
      <Footer />
      </>
  );
}

export default NotFound;