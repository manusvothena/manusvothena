"use client"

// This component helps generate placeholder images for missing assets
export const getPlaceholderImage = (name: string, width = 400, height = 400) => {
  const placeholders: Record<string, string> = {
    // Hero section placeholders
    hero_portal: `/placeholder.svg?height=600&width=600&text=Dream+Portal`,
    bg_floating_islands: `/placeholder.svg?height=1080&width=1920&text=Floating+Islands`,
    scroll_arrow: `/placeholder.svg?height=40&width=40&text=↓`,
    particles_overlay: `/placeholder.svg?height=1080&width=1920&text=Particles`,

    // Crystal wall placeholders
    crystal_wall_texture: `/placeholder.svg?height=1080&width=1920&text=Crystal+Wall`,
    brush_glow: `/placeholder.svg?height=50&width=50&text=✨`,

    // Spirit placeholders
    spirit_tiny: `/placeholder.svg?height=200&width=200&text=Tiny+Spirit`,
    spirit_isamu: `/placeholder.svg?height=200&width=200&text=Isamu+Spirit`,
    spirit_luseira: `/placeholder.svg?height=200&width=200&text=Luseira+Spirit`,
    spirit_luneira: `/placeholder.svg?height=200&width=200&text=Luneira+Spirit`,
    spirit_harvique: `/placeholder.svg?height=200&width=200&text=Harvique+Spirit`,

    // Fragment placeholders for missing characters
    fragment_tiny: `/placeholder.svg?height=400&width=400&text=Tiny`,
    fragment_isamu: `/placeholder.svg?height=400&width=400&text=Isamu`,
    fragment_luseira: `/placeholder.svg?height=400&width=400&text=Luseira`,
    fragment_ren: `/placeholder.svg?height=400&width=400&text=Ren`,
    fragment_fisher: `/placeholder.svg?height=400&width=400&text=Fisher`,
    fragment_theancientwatcher: `/placeholder.svg?height=400&width=400&text=Ancient+Watcher`,

    // Map placeholders
    map_starliumcircus: `/placeholder.svg?height=338&width=600&text=Starlium+Circus`,
    map_luminouswood: `/placeholder.svg?height=338&width=600&text=Luminous+Wood`,
    map_lakeoflostskies: `/placeholder.svg?height=338&width=600&text=Lake+of+Lost+Skies`,
  }

  return placeholders[name] || `/placeholder.svg?height=${height}&width=${width}&text=${name}`
}
