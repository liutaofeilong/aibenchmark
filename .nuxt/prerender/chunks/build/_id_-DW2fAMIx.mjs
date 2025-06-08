import { _ as __nuxt_component_0 } from './nuxt-link-BNbST7hG.mjs';
import { ref, mergeProps, withCtx, createVNode, unref, useSSRContext } from 'file://D:/develop/project/aibenchmark/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderClass } from 'file://D:/develop/project/aibenchmark/node_modules/vue/server-renderer/index.mjs';
import { _ as _imports_0 } from './virtual_public-GXG8ACDz.mjs';
import { _ as _export_sfc, a as useRoute } from './server.mjs';
import 'file://D:/develop/project/aibenchmark/node_modules/ufo/dist/index.mjs';
import '../_/nitro.mjs';
import 'file://D:/develop/project/aibenchmark/node_modules/h3/dist/index.mjs';
import 'file://D:/develop/project/aibenchmark/node_modules/destr/dist/index.mjs';
import 'file://D:/develop/project/aibenchmark/node_modules/hookable/dist/index.mjs';
import 'file://D:/develop/project/aibenchmark/node_modules/ofetch/dist/node.mjs';
import 'file://D:/develop/project/aibenchmark/node_modules/node-mock-http/dist/index.mjs';
import 'file://D:/develop/project/aibenchmark/node_modules/klona/dist/index.mjs';
import 'file://D:/develop/project/aibenchmark/node_modules/defu/dist/defu.mjs';
import 'file://D:/develop/project/aibenchmark/node_modules/scule/dist/index.mjs';
import 'file://D:/develop/project/aibenchmark/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file://D:/develop/project/aibenchmark/node_modules/pathe/dist/index.mjs';
import 'file://D:/develop/project/aibenchmark/node_modules/ipx/dist/index.mjs';
import 'file://D:/develop/project/aibenchmark/node_modules/unstorage/dist/index.mjs';
import 'file://D:/develop/project/aibenchmark/node_modules/unstorage/drivers/fs.mjs';
import 'file:///D:/develop/project/aibenchmark/node_modules/nuxt/dist/core/runtime/nitro/utils/cache-driver.js';
import 'file://D:/develop/project/aibenchmark/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file://D:/develop/project/aibenchmark/node_modules/ohash/dist/index.mjs';
import 'file://D:/develop/project/aibenchmark/node_modules/unctx/dist/index.mjs';
import 'file://D:/develop/project/aibenchmark/node_modules/vue-router/dist/vue-router.node.mjs';

const useCompanies = () => {
  const companies = ref([
    {
      id: 1,
      name: "Spotify",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/1982px-Spotify_icon.svg.png",
      category: "Entertainment",
      problem: "Limited access to music and discovery of new content",
      targetUser: "Music lovers, artists, and podcast creators",
      whyNeeded: "Easy access to vast music library and content discovery",
      useCase: "Commuting, working out, relaxing, parties",
      userReviews: "Highly rated for personalization",
      userAcquisition: "Freemium model, social sharing",
      revenue: "Subscription fees and advertising",
      keyLearnings: "Personalization algorithms create stickiness",
      challenges: "Balancing artist compensation with profitability",
      pitch: "Your entire music world in one app",
      uniqueValue: "Personalized music recommendations and extensive library",
      monetization: "Freemium model with premium subscription tiers",
      growthEngine: "Social sharing, algorithmic recommendations",
      optimization: "Better artist compensation, enhanced social features",
      scores: {
        innovation: 9,
        growth: 8,
        business: 8
      }
    },
    {
      id: 2,
      name: "Airbnb",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/2560px-Airbnb_Logo_B%C3%A9lo.svg.png",
      category: "Tech",
      problem: "Limited and expensive accommodation options for travelers",
      targetUser: "Travelers seeking authentic experiences and property owners",
      whyNeeded: "More personal and often cheaper alternative to hotels",
      useCase: "Travel accommodation, unique experiences",
      userReviews: "Mixed, but generally positive",
      userAcquisition: "Word of mouth, digital marketing",
      revenue: "Commission from bookings",
      keyLearnings: "Trust and safety are paramount",
      challenges: "Regulatory issues, safety concerns",
      pitch: "Belong anywhere",
      uniqueValue: "Access to unique stays and local experiences worldwide",
      monetization: "Service fees from both guests and hosts",
      growthEngine: "Network effects, market expansion",
      optimization: "Enhanced safety features, better host tools",
      scores: {
        innovation: 9,
        growth: 8,
        business: 9
      }
    }
  ]);
  const addCompany = (company) => {
    companies.value.push({
      id: companies.value.length + 1,
      ...company
    });
  };
  const getCompanyById = (id) => {
    return companies.value.find((company) => company.id === id);
  };
  return {
    companies,
    addCompany,
    getCompanyById
  };
};
const _sfc_main = {
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    useRoute();
    const company = ref(null);
    useCompanies();
    const getCategoryClass = (category) => {
      const classes = {
        "Tech": "bg-blue-100 text-blue-800",
        "AI": "bg-purple-100 text-purple-800",
        "Finance": "bg-green-100 text-green-800",
        "Healthcare": "bg-red-100 text-red-800",
        "Consumer": "bg-yellow-100 text-yellow-800",
        "Commerce": "bg-indigo-100 text-indigo-800",
        "Energy": "bg-orange-100 text-orange-800"
      };
      return classes[category] || "bg-gray-100 text-gray-800";
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50" }, _attrs))} data-v-7c787a5d><nav class="bg-white shadow-sm" data-v-7c787a5d><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-v-7c787a5d><div class="flex justify-between h-16 items-center" data-v-7c787a5d>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "flex items-center"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center" data-v-7c787a5d${_scopeId}><img${ssrRenderAttr("src", _imports_0)} alt="AIBenchmark Logo" class="h-10 w-10" data-v-7c787a5d${_scopeId}><div class="ml-2" data-v-7c787a5d${_scopeId}><span class="text-xl font-semibold text-gray-700" data-v-7c787a5d${_scopeId}>AIBenchmark</span><span class="ml-2 text-gray-500" data-v-7c787a5d${_scopeId}>Competitive Analysis</span></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center" }, [
                createVNode("img", {
                  src: _imports_0,
                  alt: "AIBenchmark Logo",
                  class: "h-10 w-10"
                }),
                createVNode("div", { class: "ml-2" }, [
                  createVNode("span", { class: "text-xl font-semibold text-gray-700" }, "AIBenchmark"),
                  createVNode("span", { class: "ml-2 text-gray-500" }, "Competitive Analysis")
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></nav><main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-v-7c787a5d>`);
      if (unref(company)) {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-8" data-v-7c787a5d><div class="bg-white rounded-lg shadow-lg overflow-hidden" data-v-7c787a5d><div class="p-6" data-v-7c787a5d><div class="flex items-center justify-between" data-v-7c787a5d><div class="flex items-center space-x-4" data-v-7c787a5d><div class="w-12 h-12 flex-shrink-0" data-v-7c787a5d><img${ssrRenderAttr("src", unref(company).logo)}${ssrRenderAttr("alt", unref(company).name + " logo")} class="w-full h-full object-contain" loading="lazy" data-v-7c787a5d></div><div data-v-7c787a5d><h3 class="text-xl font-semibold text-gray-900" data-v-7c787a5d>${ssrInterpolate(unref(company).name)}</h3><span class="${ssrRenderClass([getCategoryClass(unref(company).category), "inline-block px-2 py-1 text-sm rounded-full"])}" data-v-7c787a5d>${ssrInterpolate(unref(company).category)}</span></div></div><button class="text-gray-400 hover:text-blue-500 transition-colors duration-200" data-v-7c787a5d><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-7c787a5d><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" data-v-7c787a5d></path></svg></button></div></div><div class="px-6 pb-6" data-v-7c787a5d><div class="space-y-4" data-v-7c787a5d><div class="space-y-2" data-v-7c787a5d><h4 class="font-medium text-gray-700" data-v-7c787a5d>Problem</h4><p class="text-gray-600" data-v-7c787a5d>${ssrInterpolate(unref(company).problem)}</p></div><div class="space-y-2" data-v-7c787a5d><h4 class="font-medium text-gray-700" data-v-7c787a5d>Target Users</h4><p class="text-gray-600" data-v-7c787a5d>${ssrInterpolate(unref(company).targetUser)}</p></div><div class="space-y-2" data-v-7c787a5d><h4 class="font-medium text-gray-700" data-v-7c787a5d>Unique Value</h4><p class="text-gray-600" data-v-7c787a5d>${ssrInterpolate(unref(company).uniqueValue)}</p></div><div class="pt-4 border-t" data-v-7c787a5d><div class="flex justify-between text-sm" data-v-7c787a5d><div class="text-center" data-v-7c787a5d><div class="font-medium text-gray-900" data-v-7c787a5d>Innovation</div><div class="mt-1 text-blue-600" data-v-7c787a5d>${ssrInterpolate(unref(company).scores.innovation)}/10</div></div><div class="text-center" data-v-7c787a5d><div class="font-medium text-gray-900" data-v-7c787a5d>Growth</div><div class="mt-1 text-green-600" data-v-7c787a5d>${ssrInterpolate(unref(company).scores.growth)}/10</div></div><div class="text-center" data-v-7c787a5d><div class="font-medium text-gray-900" data-v-7c787a5d>Business</div><div class="mt-1 text-purple-600" data-v-7c787a5d>${ssrInterpolate(unref(company).scores.business)}/10</div></div></div></div></div></div></div><div class="space-y-6" data-v-7c787a5d><div class="bg-white rounded-lg shadow-lg overflow-hidden" data-v-7c787a5d><div class="p-6 space-y-6" data-v-7c787a5d><div class="space-y-2" data-v-7c787a5d><h4 class="font-medium text-gray-700" data-v-7c787a5d>User Feedback</h4><p class="text-gray-600" data-v-7c787a5d>${ssrInterpolate(unref(company).userReviews)}</p></div><div class="space-y-2" data-v-7c787a5d><h4 class="font-medium text-gray-700" data-v-7c787a5d>User Acquisition</h4><p class="text-gray-600" data-v-7c787a5d>${ssrInterpolate(unref(company).userAcquisition)}</p></div><div class="space-y-2" data-v-7c787a5d><h4 class="font-medium text-gray-700" data-v-7c787a5d>Revenue Model</h4><p class="text-gray-600" data-v-7c787a5d>${ssrInterpolate(unref(company).revenue)}</p></div><div class="space-y-2" data-v-7c787a5d><h4 class="font-medium text-gray-700" data-v-7c787a5d>Key Learnings</h4><p class="text-gray-600" data-v-7c787a5d>${ssrInterpolate(unref(company).keyLearnings)}</p></div><div class="space-y-2" data-v-7c787a5d><h4 class="font-medium text-gray-700" data-v-7c787a5d>Challenges</h4><p class="text-gray-600" data-v-7c787a5d>${ssrInterpolate(unref(company).challenges)}</p></div><div class="space-y-2" data-v-7c787a5d><h4 class="font-medium text-gray-700" data-v-7c787a5d>Monetization Strategy</h4><p class="text-gray-600" data-v-7c787a5d>${ssrInterpolate(unref(company).monetization)}</p></div><div class="space-y-2" data-v-7c787a5d><h4 class="font-medium text-gray-700" data-v-7c787a5d>Growth Engine</h4><p class="text-gray-600" data-v-7c787a5d>${ssrInterpolate(unref(company).growthEngine)}</p></div><div class="space-y-2" data-v-7c787a5d><h4 class="font-medium text-gray-700" data-v-7c787a5d>Optimization Opportunities</h4><p class="text-gray-600" data-v-7c787a5d>${ssrInterpolate(unref(company).optimization)}</p></div></div></div></div></div>`);
      } else {
        _push(`<div class="text-center py-12" data-v-7c787a5d><div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" data-v-7c787a5d></div><p class="mt-4 text-gray-600" data-v-7c787a5d>Loading company analysis...</p></div>`);
      }
      _push(`</main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/company/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7c787a5d"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-DW2fAMIx.mjs.map
