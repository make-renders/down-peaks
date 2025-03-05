import { Units } from '@/interfaces';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vQx8pw5IL9PV7T4ehkqiMOU8zy752K4QFL4SrLgN3SOfjO9c0tMYXsZDH7cnfgk-lOc93mhMAeA1pqP/pub?output=csv", {cache: "no-cache"});
    const csv = await response.text();

    const unit: Units[] = csv
      .split('\n')
      .slice(2)
      .map((row) => {
        const [id, uf, piso, tipologia, ambientes, baños, precio, parrilla, cochera, balcon, m2Cubiertos, m2Descubiertos, m2Totales, raxo, vendido, kuula, imagenIndexSelection, imagenIndexSelectionMobile] = row.split(",");
        return {
          id: parseInt(id),
            uf: parseInt(uf),
            piso: parseInt(piso),
            tipologia: tipologia.trim().toLowerCase(),
            ambientes: parseInt(ambientes),
            baños: parseInt(baños),
            precio: parseInt(precio),
            parrilla: parrilla.trim().toLowerCase(),
            cochera: cochera.trim().toLowerCase(),
            balcon: balcon.trim().toLowerCase(),
            m2Cubiertos: parseFloat(m2Cubiertos),
            m2Descubiertos: parseFloat(m2Descubiertos),
            m2Totales: parseFloat(m2Totales),
            raxo: raxo.trim(),
            vendido: vendido.trim().toLowerCase(),
            kuula: kuula.trim(),
            imagenIndexSelection: imagenIndexSelection.trim(),
            imagenIndexSelectionMobile: imagenIndexSelectionMobile.trim(),
        }
      });
      
      return NextResponse.json(
        { unit },
        {status: 200}
      );
  } catch (error) {
    console.error("Error fetching units", error);
    return NextResponse.json({unit: [] }, { status: 500 });
  }
}