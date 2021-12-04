class Skin {
    /**
     *
     * @param {String} head head texture of the given user
     * @param {String} full full body texture
     * @param {String} download skin in form to upload to minecraft.net
     * @param {String} render render of the skin
     * @param {String} headRender render of the head
     * @param {String} optifineCape optifine cape texture
     * @param {String} mineconCape minecon cape texture
     * @returns {Skin}
     */
    constructor(head, full, download, render, headRender, optifineCape, mineconCape) {
        this.head = head
        this.full = full
        this.download = download
        this.render = render
        this.headRender = headRender
        this.optifineCape = optifineCape
        this.mineconCape = mineconCape

        return this
    }
}

exports.Skin = Skin
