<%@ Page Title="" Language="C#" MasterPageFile="~/Pagina.Master" AutoEventWireup="true" CodeBehind="ReporteAs.aspx.cs" Inherits="CapaPresentacion.ReporteAs" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        .cardz {
            position: relative;
            width: 300px;
            height: 400px;
            background: #fff;
            border-radius: 5px;
            overflow: hidden;
            transition: .5s;
            margin: 15px 20px;
        }

            .cardz:hover {
                box-shadow: 0 5px 15px rgba(3, 89, 92, .5);
                transform: translateY(-15px);
            }

            .cardz .headz {
                height: 125px;
                width: 100%;
                position: relative;
            }

                .cardz .headz .circlez {
                    position: absolute;
                    width: 300px;
                    height: 300px;
                    border-radius: 50%;
                    background: #0b6f72;
                    bottom: 0;
                }

                .cardz .headz .imgz {
                    width: 150px;
                    height: 150px;
                    position: absolute;
                    background: #fff;
                    padding: 5px;
                    border-radius: 50%;
                    bottom: -30%;
                    left: 50%;
                    transform: translate(-50%);
                }

                    .cardz .headz .imgz img {
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                        object-fit: cover;
                    }


            .cardz .descriptionz {
                height: 200px;
                padding: 40px 20px 20px 20px;
                border-bottom: solid 1px rgba(6, 74, 76, .18);
                text-align: center;
            }

                .cardz .descriptionz h3 {
                    color: #05383a !important;
                    font-size: 18px !important;
                }

                .cardz .descriptionz h4 {
                    color: #1c5a5c !important;
                    font-size: 18px !important;
                }

                .cardz .descriptionz p {
                    margin-top: 20px !important;
                    /*margin-bottom: 0px !important;*/
                    font-size: 15px !important;
                }


            .cardz .contactz {
                width: 100%;
                height: 75px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

                .cardz .contactz a {
                    text-decoration: none !important;
                    color: #fff !important;
                    background: #157579 !important;
                    padding: 5px 20px !important;
                    border-radius: 5px !important;
                    transition: .3s !important;
                }

                    .cardz .contactz a:hover {
                        background: #0b6164;
                    }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="row">
    <div class="col-xl-12 text-center">
        <button type="button" id="btnRepoGener" class="btn btn-lime"><i class="fa fa-print t-plus-1 fa-fw fa-lg"></i> Reporte General</button>
    </div>
</div>
    <div class="row">
        <div class="col-xl-12">
            <div class="row" id="addPres">
                <!-- Aquí se insertarán las cards dinámicamente desde JavaScript -->
            </div>
        </div>
    </div>

<%--<div class="row">
    <div class="col-xl-12">
        <div class="row">
            <div class="col-xl-4 col-md-6">
                <div class="cardz">
                    <div class="headz">
                        <div class="circlez"></div>
                        <div class="imgz">
                            <img src="https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1049&q=80" alt="">
                        </div>
                    </div>

                    <div class="descriptionz">
                        <h3>María Polo</h3>
                        <h4>System Engineer</h4>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, eligendi!</p>
                    </div>

                    <div class="contactz">
                        <a href="#">Contact</a>
                    </div>
                </div>
            </div>
            <div class="col-xl-4 col-md-6">
                <div class="cardz">
                    <div class="headz">
                        <div class="circlez"></div>
                        <div class="imgz">
                            <img src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80" alt="">
                        </div>
                    </div>

                    <div class="descriptionz">
                        <h3>María Polo</h3>
                        <h4>System Engineer</h4>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, eligendi!</p>
                    </div>

                    <div class="contactz">
                        <a href="#">Contact</a>
                    </div>
                </div>
            </div>
            <div class="col-xl-4 col-md-6">
                <div class="cardz">
                    <div class="headz">
                        <div class="circlez"></div>
                        <div class="imgz">
                            <img src="https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1049&q=80" alt="">
                        </div>
                    </div>

                    <div class="descriptionz">
                        <h3>María Polo</h3>
                        <h4>System Engineer</h4>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, eligendi!</p>
                    </div>

                    <div class="contactz">
                        <a href="#">Contact</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>--%>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="assets/plugins/sweetalert/sweetalert.min.js"></script>

    <script src="js/ReporteAs.js" type="text/javascript"></script>
</asp:Content>
