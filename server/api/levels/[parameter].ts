export default defineEventHandler((event) => {
    const requstedLevel = getRouterParam(event,'parameter')
    return `${requstedLevel} ro dadi!`
})