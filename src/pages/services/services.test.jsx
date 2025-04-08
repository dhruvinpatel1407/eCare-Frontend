import {
    FETCH_SERVICES_REQUEST,
    FETCH_SERVICES_SUCCESS,
    FETCH_SERVICES_FAILURE,
    fetchServices,
  } from "./action"; // adjust path as needed
  
  global.fetch = vi.fn();
  
  describe("fetchServices action", () => {
    const dispatch = vi.fn();
  
    beforeEach(() => {
      vi.clearAllMocks();
    });
  
    it("dispatches FETCH_SERVICES_SUCCESS when fetch is successful", async () => {
      const mockServices = [{ id: 1, name: "Lab Test" }, { id: 2, name: "X-Ray" }];
  
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockServices,
      });
  
      await fetchServices()(dispatch);
  
      expect(dispatch).toHaveBeenCalledWith({ type: FETCH_SERVICES_REQUEST });
      expect(dispatch).toHaveBeenCalledWith({
        type: FETCH_SERVICES_SUCCESS,
        payload: mockServices,
      });
    });
  
    it("dispatches FETCH_SERVICES_FAILURE when fetch fails with server error", async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
      });
  
      await fetchServices()(dispatch);
  
      expect(dispatch).toHaveBeenCalledWith({ type: FETCH_SERVICES_REQUEST });
      expect(dispatch).toHaveBeenCalledWith({
        type: FETCH_SERVICES_FAILURE,
        payload: "No services found",
      });
    });
  
    it("dispatches FETCH_SERVICES_FAILURE when fetch throws an error", async () => {
      fetch.mockRejectedValueOnce(new Error("Network error"));
  
      await fetchServices()(dispatch);
  
      expect(dispatch).toHaveBeenCalledWith({ type: FETCH_SERVICES_REQUEST });
      expect(dispatch).toHaveBeenCalledWith({
        type: FETCH_SERVICES_FAILURE,
        payload: "Network error",
      });
    });
  });
  