require("spinal-env-drive-core");

/**
 * SpinalDrive_App_FileExplorer_inspector
 * @extends {SpinalDrive_App}
 */
class SpinalDrive_App_FileExplorer_inspector extends SpinalDrive_App {

  /**
   * Creates an instance of SpinalDrive_App_FileExplorer_inspector.
   * @memberof SpinalDrive_App_FileExplorer_inspector
   */
  constructor() {
    super("OpenGroupStudioFileExplorer", "Open with SpinalBIM Inspector", 6, "sort", "Open the SpinalBIM Inspector");
    this.order_priority = 5;
  }
  /**
   * method to handle the selection
   * 
   * @param {any} element 
   * @memberof SpinalDrive_App_FileExplorer_inspector
   */
  action(obj) {

    let authService = obj.scope.injector.get('authService');
    let fs_path = obj.scope.fs_path;
    let username = authService.get_user().username;
    let path = "/__users__/" + username;
    for (var i = 1; i < fs_path.length; i++) {
      path += '/' + fs_path[i].name;
    }
    path += '/' + obj.file.name;
    let myWindow = window.open('', '');
    let location = "/html/inspector/?path=" + btoa(path);
    myWindow.document.location = location;
    myWindow.focus();
  }

  /**
   * method to know if the app is needed to be shown.
   * @param {Object} d node of the tree selectionned
   * @returns {boolean}
   * @memberof SpinalDrive_App_FileExplorer_inspector
   */
  is_shown(d) {
    if (d && d.file && d.file._server_id) {
      let file = FileSystem._objects[d.file._server_id];
      if (file && file instanceof File && file._info.model_type &&
        (file._info.model_type.get() === 'BIM Project' ||
          file._info.model_type.get() === "Digital twin")) {
        return true;
      }
    }
    return false;
  }
}


spinalDrive_Env.add_applications('FileExplorer', new SpinalDrive_App_FileExplorer_inspector());

module.exports.FileExplorerSpinalBIMInspector = SpinalDrive_App_FileExplorer_inspector;