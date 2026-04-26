import heroImage from "../assets/hero.png";
import landingImage from "../assets/landing.png";
import appDownloadImage from "../assets/appDownload.png";
import calanderIcon from "../assets/calander_icon.avif";
import collectionsImage from "../assets/collections.avif";
import giftCardsImage from "../assets/gift_cards.avif";
import gourmetOptionImage from "../assets/gourmet_option.avif";
import healthyOptionImage from "../assets/healthy_option.avif";
import offersImage from "../assets/offers.avif";
import planPartyImage from "../assets/plan_a_party.avif";
import vegOptionImage from "../assets/veg_option.avif";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";
import { Clock3, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type AppFeature = {
  title: string;
  image: string;
  className?: string;
};

const leftColumnFeatures: AppFeature[] = [
  { title: "Healthy", image: healthyOptionImage },
  { title: "Veg Mode", image: vegOptionImage },
  { title: "Plan a Party", image: planPartyImage },
  { title: "Gift Cards", image: giftCardsImage },
];

const rightColumnFeatures: AppFeature[] = [
  { title: "Gourmet", image: gourmetOptionImage },
  { title: "Offers", image: offersImage },
  { title: "Collections", image: collectionsImage },
];

const AppFeatureTile = ({ title, image, className }: AppFeature) => (
  <div
    className={cn(
      "flex h-[220px] flex-col items-center justify-center gap-4 rounded-[28px] border border-white/80 bg-white/92 p-5 text-center shadow-[0_20px_40px_rgba(15,23,42,0.08)] backdrop-blur",
      className
    )}
  >
    <img src={image} alt={title} className="h-24 w-24 object-contain" />
    <p className="text-xl font-semibold text-slate-800">{title}</p>
  </div>
);

const AppPerksTile = () => (
  <div className="flex h-[220px] flex-col items-center justify-center gap-4 rounded-[28px] border border-white/80 bg-white/92 p-5 text-center shadow-[0_20px_40px_rgba(15,23,42,0.08)] backdrop-blur">
    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-orange-50 text-orange-500">
      <Sparkles className="h-12 w-12" />
    </div>
    <p className="text-xl font-semibold text-slate-800">App Perks</p>
  </div>
);

const HomePage = () => {
  const navigate = useNavigate();

  const handleSearchSubmit = (searchFormValues: SearchForm) => {
    navigate({
      pathname: `/search/${searchFormValues.searchQuery}`,
    });
  };

  return (
    <div className="flex flex-col gap-14">
      <section className="relative overflow-hidden">
        <img
          src={heroImage}
          alt="Featured burger platter"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(108deg,rgba(67,20,7,0.72)_0%,rgba(124,45,18,0.58)_32%,rgba(234,88,12,0.26)_62%,rgba(255,255,255,0.08)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,rgba(255,255,255,0.14),transparent_34%)]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white/88 via-white/30 to-transparent" />
        <div className="relative flex min-h-[calc(100svh-88px)] flex-col px-5 pb-10 pt-8 md:min-h-[calc(100svh-96px)] md:px-10 md:pb-14 md:pt-10">
          <div className="mx-auto w-full max-w-6xl">
            <SearchBar
              placeHolder="Search cities like Delhi, Mumbai or Bengaluru"
              onSubmit={handleSearchSubmit}
              variant="hero"
              showReset={false}
            />
          </div>

          <div className="mx-auto mt-10 grid w-full max-w-6xl flex-1 items-center gap-10 md:px-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.72fr)] lg:px-6">
            <div className="flex max-w-3xl flex-col gap-5 text-white">
              <span className="w-fit rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold uppercase text-orange-50 backdrop-blur">
                Fresh meals near you
              </span>
              <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
                Crave less, discover more, order beautifully.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-orange-50/92 md:text-2xl">
                Search faster, find better restaurants, and bring your next
                favorite dish home in minutes.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                {["Biryani", "Pizza", "Burgers", "Thalis", "Desserts"].map(
                  (item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/18 bg-white/12 px-4 py-2 text-sm font-medium text-orange-50 backdrop-blur"
                    >
                      {item}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="rounded-[28px] border border-white/20 bg-white/12 p-6 text-white shadow-[0_24px_60px_rgba(15,23,42,0.16)] backdrop-blur-xl">
                <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-orange-100/90">
                  <Sparkles className="h-4 w-4" />
                  Tonight looks good
                </div>
                <div className="mt-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 text-orange-200" />
                    <div>
                      <p className="font-semibold text-white">Search by city first</p>
                      <p className="text-sm leading-6 text-orange-50/80">
                        Start with your area, then compare cuisines and delivery
                        times without the clutter.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock3 className="mt-0.5 h-5 w-5 text-orange-200" />
                    <div>
                      <p className="font-semibold text-white">Built for quick decisions</p>
                      <p className="text-sm leading-6 text-orange-50/80">
                        Cleaner search, sharper restaurant cards, and a faster
                        path from craving to checkout.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="mt-0.5 h-5 w-5 text-orange-200" />
                    <div>
                      <p className="font-semibold text-white">Reliable ordering flow</p>
                      <p className="text-sm leading-6 text-orange-50/80">
                        Keep browsing, adding dishes, and managing orders in one
                        consistent experience.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto overflow-hidden rounded-[32px] border border-rose-100/70 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.95),rgba(255,247,245,0.98)_42%,rgba(255,241,238,0.94)_100%)] px-6 py-14 shadow-[0_24px_60px_rgba(15,23,42,0.06)] md:px-10 md:py-18">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold leading-tight tracking-tight text-orange-600 md:text-6xl">
            What&apos;s waiting for you on the app?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 md:text-2xl">
            Discover thoughtful features designed to make everyday ordering
            feel easier, quicker, and a little more fun.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px_minmax(0,1fr)] lg:items-center">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {leftColumnFeatures.map((feature) => (
              <AppFeatureTile key={feature.title} {...feature} />
            ))}
          </div>

          <div className="relative mx-auto flex h-[420px] w-[270px] items-center justify-center rounded-[46px] border-[12px] border-slate-950 bg-[linear-gradient(180deg,#fffaf5_0%,#ffffff_42%,#fff3eb_100%)] p-4 shadow-[0_20px_45px_rgba(15,23,42,0.14)] lg:h-[420px] lg:w-[270px]">
            <div className="absolute left-1/2 top-4 h-5 w-28 -translate-x-1/2 rounded-full bg-slate-950" />
            <div className="absolute inset-x-8 bottom-4 h-10 rounded-full bg-orange-100/70 blur-2xl" />
            <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-5 rounded-[32px] border border-white/90 bg-white/94 px-6 py-8 text-center shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
              <img
                src={calanderIcon}
                alt="Schedule your order"
                className="h-24 w-24 object-contain"
              />
              <div className="space-y-2">
                <p className="text-3xl font-bold tracking-tight text-slate-900">
                  Schedule
                </p>
                <p className="text-2xl font-semibold text-slate-900">
                  your order
                </p>
              </div>
              <p className="text-sm leading-6 text-slate-500">
                Plan meals ahead and have your favorites arrive exactly when
                you need them.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {rightColumnFeatures.map((feature) => (
              <AppFeatureTile key={feature.title} {...feature} />
            ))}
            <AppPerksTile />
          </div>
        </div>
      </section>

      <section className="container mx-auto grid overflow-hidden rounded-[28px] border border-orange-100/80 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.08)] lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative min-h-[320px] bg-orange-50">
          <img
            src={landingImage}
            alt="Food ordering illustration"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/12 to-transparent" />
        </div>
        <div className="flex flex-col justify-center gap-5 px-8 py-10 md:px-10">
          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-600">
            Mobile experience
          </span>
          <h2 className="max-w-md text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
            Keep your regular spots one tap away.
          </h2>
          <p className="max-w-lg text-base leading-7 text-slate-600">
            The app companion is on the way. When it lands, your saved
            addresses, favorite restaurants, and repeat orders will feel even
            quicker.
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-slate-600">
            <span className="rounded-full bg-orange-50 px-4 py-2">
              Cleaner reorders
            </span>
            <span className="rounded-full bg-orange-50 px-4 py-2">
              Faster checkout
            </span>
            <span className="rounded-full bg-orange-50 px-4 py-2">
              Better dish browsing
            </span>
          </div>
          <div className="pt-2">
            <img
              src={appDownloadImage}
              alt="App store download badges"
              className="max-w-[260px]"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
