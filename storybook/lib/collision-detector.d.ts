export interface CollisionElement {
    element: HTMLElement;
    id: string;
    priority: number;
    accumulationArea: "top" | "all";
}
export declare class CollisionDetector {
    private elements;
    private elementRects;
    /**
     * Registers an element with the given id and updates its bounding box.
     * The element will be used for collision detection in the checkCollision method.
     * @param {string} id - Unique identifier for the element.
     * @param {HTMLElement} element - The element to register.
     * @param {Partial<CollisionElement>= {}} options - Optional settings for the element.
     * @property {number} [options.priority=0] - The priority of the element for collision detection.
     * @property {"top" | "all"} [options.accumulationArea="top"] - The area of the element where snowflakes will accumulate.
     */
    registerElement(id: string, element: HTMLElement, options?: Partial<CollisionElement>): void;
    /**
     * Unregisters an element from the collision detector.
     * This method removes the element from the internal maps and should be called when the element is no longer needed for collision detection.
     * @param {string} id - The unique identifier of the element to unregister.
     */
    unregisterElement(id: string): void;
    /**
     * Updates the bounding boxes of all registered elements.
     * This method should be called whenever the position or size of a registered element changes.
     */
    updateRects(): void;
    /**
     * Returns the cached bounding client rect for a registered element.
     * This is useful when you need to convert global coordinates into
     * element-local coordinates (for example, when rendering accumulated
     * snow inside the element instead of in the global viewport).
     *
     * @param {string} id - The unique identifier of the element.
     * @returns {DOMRect | null} The element's bounding rect or null if not found.
     */
    getElementRect(id: string): DOMRect | null;
    /**
     * Updates the bounding box of the element with the given id.
     * This method should be called whenever the position or size of a registered element changes.
     * @param {string} id - The unique identifier of the element to update.
     */
    private updateRect;
    /**
     * Checks if the given (x, y) coordinates collide with any of the registered elements.
     * The method returns the id of the element with the highest priority that the coordinates collide with, or null if no collision is detected.
     * @param {number} x - The x-coordinate to check for collision.
     * @param {number} y - The y-coordinate to check for collision.
     * @returns {string | null} The id of the element with the highest priority that the coordinates collide with, or null if no collision is detected.
     */
    checkCollision(x: number, y: number): string | null;
    /**
     * Returns the coordinates of the collision point with the element with the given id.
     * The coordinates are clamped to the bounding box of the element.
     * If the element has an accumulation area set to "top", the y-coordinate is clamped to the top third of the element's height.
     * @param {string} id - The unique identifier of the element to check for collision.
     * @param {number} x - The x-coordinate to check for collision.
     * @param {number} y - The y-coordinate to check for collision.
     * @returns {{ x: number, y: number }} The coordinates of the collision point with the element.
     */
    getCollisionPoint(id: string, x: number, y: number): {
        x: number;
        y: number;
    };
}
//# sourceMappingURL=collision-detector.d.ts.map