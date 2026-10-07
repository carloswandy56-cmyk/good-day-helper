import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Check, ShoppingCart, Star, Users } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

const products = [
  {
    title: "Do Zero à Primeira Venda no Marketing Digital",
    category: "Marketing Digital",
    price: "259 MT",
    description: "Aprenda a criar e vender produtos digitais usando IA, Canva e estratégias simples.",
  },
  {
    title: "Guia Prático do Meta Ads",
    category: "Publicidade Online",
    price: "199 MT",
    description: "Aprenda os fundamentos dos anúncios no Facebook e Instagram.",
  },
  {
    title: "Expert no Canva",
    category: "Design",
    price: "149 MT",
    description: "Crie cartazes profissionais e conteúdos para redes sociais.",
  },
];

const testimonials = [
  "Conteúdo simples e fácil de aplicar.",
  "Os materiais ajudam a aprender de forma prática.",
  "Uma plataforma pensada para iniciantes.",
];

function Index() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="flex items-center justify-between px-6 py-5 lg:px-16">
        <h1 className="text-2xl font-bold">Digital Store</h1>
        <button className="rounded-xl bg-slate-900 px-4 py-2 text-white">Área do Cliente</button>
      </header>

      <section className="px-6 py-16 text-center lg:px-16">
        <h2 className="mx-auto max-w-4xl text-4xl font-bold md:text-6xl">Aprenda novas habilidades com infoprodutos práticos</h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">E-books e materiais digitais para marketing, design, tecnologia e desenvolvimento pessoal.</p>
        <button className="mt-8 rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white">Ver Produtos</button>
      </section>

      <section className="grid gap-6 px-6 pb-16 md:grid-cols-3 lg:px-16">
        {products.map((product) => (
          <article key={product.title} className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700"><BookOpen /></div>
            <p className="text-sm text-blue-600">{product.category}</p>
            <h3 className="mt-2 text-xl font-bold">{product.title}</h3>
            <p className="mt-3 text-sm text-slate-600">{product.description}</p>
            <div className="mt-5 flex items-center justify-between"><strong>{product.price}</strong><button className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-white"><ShoppingCart size={18}/> Comprar</button></div>
          </article>
        ))}
      </section>

      <section className="bg-white px-6 py-12 lg:px-16">
        <h2 className="text-3xl font-bold">Por que escolher a Digital Store?</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {['Acesso imediato', 'Conteúdo prático', 'Aprenda no seu ritmo'].map((item) => <div className="rounded-2xl bg-slate-50 p-5" key={item}><Check className="mb-2"/>{item}</div>)}
        </div>
      </section>

      <section className="px-6 py-12 lg:px-16">
        <div className="flex items-center gap-2"><Users/><h2 className="text-3xl font-bold">O que os clientes dizem</h2></div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">{testimonials.map((t)=><div className="rounded-2xl bg-white p-5 shadow-sm" key={t}><Star className="mb-3 fill-yellow-400 text-yellow-400"/>{t}</div>)}</div>
      </section>

      <footer className="bg-slate-900 px-6 py-8 text-center text-white">© 2026 Digital Store - Todos os direitos reservados</footer>
    </main>
  );
}
