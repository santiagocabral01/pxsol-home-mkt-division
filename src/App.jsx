import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { HotelProvider } from './context/HotelContext'
import { SeoGeoProvider } from './context/SeoGeoContext'
import Landing from './screens/Landing'
import Onboarding from './screens/Onboarding'
import BrandDNA from './screens/BrandDNA'
import Generating from './screens/Generating'
import HubLayout from './screens/HubLayout'
import Website from './screens/channels/Website'
import SocialMedia from './screens/channels/SocialMedia'
import GoogleBusiness from './screens/channels/GoogleBusiness'
import OTAs from './screens/channels/OTAs'
import EmailMarketing from './screens/channels/EmailMarketing'
import Summary from './screens/channels/Summary'
import Settings from './screens/channels/Settings'
import SeoGeoLayout from './screens/seoGeo/SeoGeoLayout'
import Dashboard from './screens/seoGeo/Dashboard'
import GeoTracker from './screens/seoGeo/GeoTracker'
import SeoAnalytics from './screens/seoGeo/SeoAnalytics'
import Sources from './screens/seoGeo/Sources'
import Generator from './screens/seoGeo/Generator'
import Suggestions from './screens/seoGeo/Suggestions'
import Reports from './screens/seoGeo/Reports'

export default function App() {
  return (
    <HotelProvider>
      <SeoGeoProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/app" element={<Navigate to="/app/onboarding" replace />} />
            <Route path="/app/onboarding" element={<Onboarding />} />
            <Route path="/app/brand-dna" element={<BrandDNA />} />
            <Route path="/app/generating" element={<Generating />} />
            <Route path="/app/hub" element={<HubLayout />}>
              <Route index element={<Navigate to="sitio-web" replace />} />
              <Route path="sitio-web" element={<Website />} />
              <Route path="redes-sociales" element={<SocialMedia />} />
              <Route path="google-business" element={<GoogleBusiness />} />
              <Route path="otas" element={<OTAs />} />
              <Route path="email" element={<EmailMarketing />} />
              <Route path="seo-geo" element={<SeoGeoLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="geo-tracker" element={<GeoTracker />} />
                <Route path="seo" element={<SeoAnalytics />} />
                <Route path="fuentes" element={<Sources />} />
                <Route path="generador" element={<Generator />} />
                <Route path="sugerencias" element={<Suggestions />} />
                <Route path="reportes" element={<Reports />} />
              </Route>
              <Route path="configuracion" element={<Settings />} />
              <Route path="resumen" element={<Summary />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </SeoGeoProvider>
    </HotelProvider>
  )
}
