// Check if current platform is supported.
if(process.platform!=='linux' && process.platform!=='darwin') {
  console.error("ERROR: Unsupported platform '"+process.platform+"'!")
  process.exit(1)
}

//@ts-ignore // Ignored because of missing declaration files.
import gi from 'node-gtk';
/**
 * Gets GTK color scheme using `node-gtk` module.
 * Useful to integrate HTML/CSS look with system theme in 
 * web-based projects and/or sofware, like Electron applications.
 * 
 * @returns
 * JavaScript object containing GTK colors
 * definied with `@define-color` method.
 * 
 * @example 
 * ```
 * // GTK default background color
 * getColorScheme().theme_bg_color 
 * ```
 */
export function getColorScheme(gtkVersion?:string) {

  // Initialize GTK libraries
  const version = gtkVersion || '3.0'
  const gtk = gi.require('Gtk', version)
  gi.startLoop()
  gtk.init()

  // Load CSS of current GTK theme

  const gtkCss:[string] = gtk.CssProvider
    .getNamed(gtk.Settings.getDefault()
    .getProperty("gtk-theme-name"))
    .toString()
    .split('\n')

  // Parse CSS colors to JavaScript object (using @define-color)

  let gtkColors:{[index:string]:string}|{} = {}

  for(const line of gtkCss) if(line.includes('@define-color')) {
    
    let key = line.split(' ')[1]
    let value = line.split(' ')[2]

    if(key === undefined) 
      break;

    if(value !== undefined)
      value = value.replace(/\;/,'')

    // Format output to JSON

    gtkColors = Object.assign(JSON.parse('{ "'+key+'":"'+value+'" }'), gtkColors)

  }
  return gtkColors
}