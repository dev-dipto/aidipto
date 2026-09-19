import { useState } from 'react';
import { Heart, Menu, Search, ShoppingBag } from 'lucide-react';
import DemoBadge from '../ui/DemoBadge';
import type { DeviceMode } from '../DevicePreview';

const categories = ['New in', 'Desk', 'Audio', 'Lighting', 'Storage'];

const products = [
  { id: 'p1', name: 'Angle desk lamp', price: '৳ 4,200', tone: 'from-[#16243a] to-[#0d1522]' },
  { id: 'p2', name: 'Linen chair cover', price: '৳ 2,850', tone: 'from-[#13302c] to-[#0c1a18]' },
  { id: 'p3', name: 'Walnut monitor stand', price: '৳ 6,400', tone: 'from-[#2a2136] to-[#141020]' },
  { id: 'p4', name: 'Felt cable tray', price: '৳ 1,150', tone: 'from-[#1b2740] to-[#0e1524]' },
];

const featured = [
  { id: 'f1', name: 'Studio bundle', price: '৳ 11,900' },
  { id: 'f2', name: 'Desk starter set', price: '৳ 7,300' },
];

/** Demo storefront interface. Prices and products are placeholders. */
export function DemoEcommerce({ mode = 'desktop' }: { mode?: DeviceMode }) {
  const wide = mode === 'desktop';
  const roomy = mode !== 'mobile';
  const [cart, setCart] = useState(0);
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  return (
    <div className="h-full overflow-y-auto bg-[#080c13] text-mist">
      <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-hairline bg-[#080c13]/95 px-4 py-3 backdrop-blur">
        {!wide && <Menu size={16} className="text-muted" aria-hidden="true" />}
        <span className="font-display text-[13px] font-semibold tracking-[0.18em]">KOTHA</span>
        <nav aria-label="Demo store" className={`ml-4 gap-4 text-[12px] text-muted ${wide ? 'flex' : 'hidden'}`}>
          <span>Shop</span>
          <span>Collections</span>
          <span>About</span>
        </nav>
        <div className="ml-auto flex items-center gap-3 text-muted">
          <Search size={15} aria-hidden="true" />
          <span className="relative">
            <ShoppingBag size={15} aria-hidden="true" />
            <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-azure px-1 font-mono text-[9px] text-void">
              {cart}
            </span>
          </span>
        </div>
      </header>

      <section className="relative border-b border-hairline px-4 py-8">
        <DemoBadge label="DEMO PROJECT" />
        <h3 className="mt-3 font-display text-[clamp(1.2rem,4vw,1.9rem)] font-semibold leading-tight">
          Things that make a desk work better.
        </h3>
        <p className="mt-2 max-w-[42ch] text-[13px] text-muted">
          A sample storefront built to show product structure, cart behaviour and the order workflow behind it.
        </p>
        <button
          type="button"
          className="mt-4 rounded-md bg-azure px-4 py-2 text-[12.5px] font-medium text-void"
          onClick={() => setCart((c) => c + 1)}
        >
          Shop the set
        </button>
      </section>

      <nav aria-label="Demo categories" className="no-scrollbar flex gap-2 overflow-x-auto border-b border-hairline px-4 py-3">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={`shrink-0 rounded-full border px-3 py-1 text-[11.5px] transition-colors ${
              category === activeCategory
                ? 'border-azure/60 bg-azure/10 text-mist'
                : 'border-hairline text-muted'
            }`}
          >
            {category}
          </button>
        ))}
      </nav>

      <section className="px-4 py-5">
        <div className="mb-3 flex items-center justify-between">
          <h4 className="text-[13px] font-medium">{activeCategory}</h4>
          <span className="font-mono text-[10px] text-faint">{products.length} items</span>
        </div>
        <div className={`grid gap-3 ${wide ? 'grid-cols-4' : roomy ? 'grid-cols-3' : 'grid-cols-2'}`}>
          {products.map((product) => (
            <article key={product.id} className="overflow-hidden rounded-lg border border-hairline bg-panel">
              <div className={`relative aspect-[4/3] bg-gradient-to-br ${product.tone}`}>
                <span className="absolute inset-0 grid place-items-center font-mono text-[9px] text-faint">
                  product image
                </span>
                <Heart size={13} className="absolute right-2 top-2 text-muted" aria-hidden="true" />
              </div>
              <div className="p-3">
                <p className="truncate text-[12.5px]">{product.name}</p>
                <p className="mt-0.5 font-mono text-[11.5px] text-azure">{product.price}</p>
                <button
                  type="button"
                  onClick={() => setCart((c) => c + 1)}
                  className="mt-2.5 w-full rounded-md border border-hairline py-1.5 text-[11.5px] text-muted transition-colors hover:border-azure/50 hover:text-mist"
                >
                  Add to cart
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-hairline px-4 py-5">
        <h4 className="mb-3 text-[13px] font-medium">Featured</h4>
        <div className={`grid gap-3 ${roomy ? 'grid-cols-2' : ''}`}>
          {featured.map((item) => (
            <div key={item.id} className="flex items-center gap-3 rounded-lg border border-hairline bg-panel p-3">
              <div className="h-12 w-12 shrink-0 rounded-md bg-gradient-to-br from-[#16243a] to-[#0d1522]" />
              <div className="min-w-0">
                <p className="truncate text-[12.5px]">{item.name}</p>
                <p className="font-mono text-[11px] text-muted">{item.price}</p>
              </div>
              <button
                type="button"
                onClick={() => setCart((c) => c + 1)}
                className="ml-auto rounded-md bg-raised px-3 py-1.5 text-[11.5px] text-mist"
              >
                Add
              </button>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-hairline px-4 py-4 font-mono text-[10px] text-faint">
        Demo storefront — no checkout, no payment processing.
      </footer>
    </div>
  );
}

export default DemoEcommerce;
