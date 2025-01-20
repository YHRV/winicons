'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'

export default function IconList() {
  const [icons, setIcons] = useState<any[] | null>(null)
  const [loading, setLoading] = useState(true)  // Para manejar el estado de carga
  const [error, setError] = useState<string | null>(null)  // Para manejar errores

  const supabase = createClient()

  useEffect(() => {
    const getIcons = async () => {
      try {
        // Realiza la consulta a la tabla 'icons' en Supabase
        const { data, error } = await supabase.from('icons').select()
        
        if (error) throw new Error(error.message)
        
        // Actualiza el estado con los datos obtenidos
        setIcons(data)
        setLoading(false)  // Finaliza el estado de carga
      } catch (err: any) {
        setError(err.message)  // Captura errores si los hay
        setLoading(false)
      }
    }

    getIcons()
  }, [])  // Se ejecuta una vez cuando el componente se monta

  // Mientras se cargan los datos
  if (loading) return <p>Loading icons...</p>

  // Si hay algún error
  if (error) return <p>Error loading icons: {error}</p>

  return (
    <div>
      <h1>Icons</h1>
      <div>
        {icons?.map((icon) => (
          <div key={icon.id}>
            <h3>{icon.name}</h3>
            <p>{icon.description}</p>
            <img src={icon.file_url} alt={icon.name} />
          </div>
        ))}
      </div>
    </div>
  )
}