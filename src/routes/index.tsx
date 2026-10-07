import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, CheckCircle, ShoppingCart, Star } from "lucide-react";

export const Route = createFileRoute("/")({ component: Index });

const products = [
  { title: "Do Zero à Primeira Venda no Marketing Digital", category: "Marketing", price: "259 MT", old: "399 MT" },
  { title: "Guia Prático do Meta Ads", category: "Publicidade", price: "199 MT", old: "299 MT" },
  { title: "Expert no Canva", category: "Design", price: "149 MT", old: "249 MT" },
];

function Index() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-white text-slate-900">
      <header className="flex items-center justify-between px-6 py-6 lg:px-20">
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Digital Store</h1>
        <button className="rounded-full bg-slate-900 px-5 py-3 text-white">Área do Cliente</button>
      </header>

      <section className="px-6 py-20 text-center lg:px-20">
        <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm text-indigo-700">Infoprodutos práticos</span>
        <h2 className="mx-auto mt-6 max-w-4xl text-5xl font-black leading-tight">Aprenda novas habilidades e transforme conhecimento em resultados</h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">E-books criados para ajudar iniciantes em marketing digital, design e desenvolvimento pessoal.</p>
        <button className="mt-8 rounded-full bg-indigo-600 px-10 py-4 font-bold text-white shadow-lg transition hover:scale-105">Explorar Produtos</button>
      </section>

      <section className="grid gap-8 px-6 pb-20 md:grid-cols-3 lg:px-20">
        {products.map((p) => (
          <article key={p.title} className="group rounded-3xl bg-white p-6 shadow-lg transition hover:-translate-y-2">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600"><BookOpen/></div>
            <p className="mt-5 text-sm font-semibold text-indigo-600">{p.category}</p>
            <h3 className="mt-2 text-xl font-bold">{p.title}</h3>
            <div className="my-4 flex gap-2"><Star className="fill-yellow-400 text-yellow-400"/><Star className="fill-yellow-400 text-yellow-400"/><Star className="fill-yellow-400 text-yellow-400"/></div>
            <div><span className="text-sm text-slate-400 line-through">{p.old}</span><p className="text-2xl font-black">{p.price}</p></div>
            <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 text-white transition hover:bg-indigo-600"><ShoppingCart size={18}/> Comprar agora</button>
          </article>
        ))}
      </section>

      <section className="bg-slate-900 px-6 py-14 text-white lg:px-20">
        <h2 className="text-center text-3xl font-bold">Por que escolher a Digital Store?</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {["Acesso imediato", "Conteúdo simples e prático", "Aprenda no seu ritmo"].map((x)=><div key={x} className="rounded-2xl bg-white/10 p-5"><CheckCircle className="mb-3"/>{x}</div>)}
        </div>
      </section>

      <footer className="px-6 py-8 text-center text-slate-500">© 2026 Digital Store</footer>
    </main>
  );
}
