module.exports = ({ page, limit, skip, total }) => {
    const next_page = (total - skip) / limit > 1 ? page + 1 : null;
    const previous_page = page - 1 ? page - 1 : null;
    return { next_page, previous_page, total };
}